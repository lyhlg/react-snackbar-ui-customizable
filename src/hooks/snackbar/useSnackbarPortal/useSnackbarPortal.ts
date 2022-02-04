import { useEffect, useState } from 'react'

interface IUseSnackbarContainer {
  option: {
    position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
    zIndex: string | number
  }
}

interface IUseSnackbarContainerReturn {
  loaded: boolean
  portalId: string
}

const useSnackbarContainer = ({ option }: IUseSnackbarContainer): IUseSnackbarContainerReturn => {
  const {position, zIndex} = option
  const [loaded, setLoaded] = useState(false)
  const [portalId] = useState('snackbar-portal')
  const [verticalPosition, horizontalPosition] = position.split('-')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const div = document.createElement('div')
    div.setAttribute('role', 'log')
    div.id = portalId
    div.style.position = 'fixed'
    div.style[verticalPosition as any] = '10px'
    div.style.zIndex = zIndex.toString() ?? '100'
    if (horizontalPosition === 'right') {
      div.style.right = '10px'
    }
    if (horizontalPosition === 'left') {
      div.style.left = '10px'
    }
    if (horizontalPosition === 'center') {
      div.style.display = 'flex'
      div.style.alignItems = 'center'
      div.style.display = 'flex'
    }
    document.getElementsByTagName('body')[0].prepend(div)

    setLoaded(true)

    return () => {
      document.getElementsByTagName('body')[0].removeChild(div)
    }
  }, [portalId])

  return { loaded, portalId }
}

export default useSnackbarContainer
