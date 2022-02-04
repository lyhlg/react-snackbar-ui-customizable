import { act, renderHook, WrapperComponent } from '@testing-library/react-hooks'
import React from 'react'

import { ActionType, Snackbar } from '@/context/snackbarContainerReducer'
import { SnackbarContextProvider } from '@/context/snackbarContext'

import useSnackbar from '.'

describe('useSnackbar', () => {
  describe('snackbar container가 랜더링 되면', () => {
    let wrapper: WrapperComponent<unknown>
    let snackbars: Snackbar[]
    let mockDispatch: any
    let mockUseContext: any
    beforeEach(() => {
      // eslint-disable-next-line react/display-name
      wrapper = ({ children }: { children: React.ReactNode }) => (
        <SnackbarContextProvider>{children}</SnackbarContextProvider>
      )
      snackbars = []

      mockDispatch = jest.fn().mockImplementation(({ type, payload }) => {
        let _snackbars: Snackbar[] = snackbars
        switch (type) {
          case ActionType.ADD:
            _snackbars.push(payload.options)
            snackbars = _snackbars
            break
          case ActionType.REMOVE:
            _snackbars = snackbars.filter((s) => s.id !== payload.id)
            snackbars = _snackbars
            break
          default:
            break
        }
      })
      mockUseContext = jest.fn().mockImplementation(() => ({
        snackbars: [],
        dispatch: mockDispatch,
      }))

      React.useContext = mockUseContext
    })
    test('snackbar를 추가하면, snackbars 리스트에 추가된다.', () => {
      const { result } = renderHook(() => useSnackbar(), { wrapper })

      act(() => {
        result.current.snackbar.on({ message: 'message' })
      })

      expect(mockUseContext).toHaveBeenCalled()
      expect(snackbars).toHaveLength(1)
    })

    test('snackbar를 삭제하면, snackbars 리스트에서 삭제된다.', () => {
      const { result } = renderHook(() => useSnackbar(), { wrapper })

      act(() => {
        result.current.snackbar.on({ message: 'message1' })
        result.current.snackbar.on({ message: 'message2' })
        result.current.snackbar.on({ message: 'message3' })
      })

      expect(snackbars).toHaveLength(3)

      act(() => {
        const id = snackbars[0].id
        result.current.snackbar.off(id)
      })

      expect(snackbars).toHaveLength(2)
    })
  })
})
