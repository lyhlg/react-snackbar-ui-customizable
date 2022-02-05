# Getting Started
**Installation**
```javascript
$ npm i react-snackbar-ui-customizable
or
$ yarn add react-snackbar-ui-customizable
```

# Features

## Snackbar Provider Setup 
To use snackbar, you must wrap the `SnackbarContextProvider` at the top of your application
```
import { SnackbarContextProvider } from 'react-snackbar-ui-customizable'

<SnackbarContextProvider id="snackbar-portal-unique-id">
  {children}
</SnackbarContextProvider>
```

## Snackbar Usage
Then you can use it by declaring it in a react hook method inside the component you need.
```
import { useSnackbar } from 'react-snackbar-ui-customizable'

const Example = (): JSX.Element => {
  const snackbar = useSnackbar();

  return (
    <button onClick={() => snackbar.on({ title: 'snackbar title', message: 'this is snackbar message' })}>
      Show Snackbar!
    </button>
  )
}

```

# API

## SnackbarContextProvider
(* Required)
| property name | Description                    |
| ------------- | ------------------------------ |
| `id*`         | portal id.                     |
| `option`      | portal options                 |
| `children*`   | your application components    |

### option (all of the option property is optional)
| property name | Description                    |
| ------------- | ------------------------------ |
| `position`    | will be displayed (top-left, top-center, **top-right(default)**, bottom-left, bottom-center, bottom-right) |
| `zIndex`      | z index (default: 100)                       |
| `duration`    | 0: infinity, 1 ~ : for the given time, snackbar appears and disappears (default: 3s)  |
| `successIcon`      | Success Icon (default(CheckCircleOutlined of @ant-design/icon)), - React.ReactNode or JSX.Element                      |
| `errorIcon`      | Error Icon (default(WarningOutlined of @ant-design/icon)), - React.ReactNode or JSX.Element                      |
| `warnIcon`      | Warning Icon (default(ExclamationCircleOutlined of @ant-design/icon)), - React.ReactNode or JSX.Element                      |
| `infoIcon`      | Information Icon (default(InfoCircleOutlined of @ant-design/icon)), - React.ReactNode or JSX.Element                      |
| `closeIcon`      | Close Icon (default(CloseOutlined of @ant-design/icon)), - React.ReactNode or JSX.Element                      |

## useSnackbar
| property name | Description                    |
| ------------- | ------------------------------ |
| `on`          | execution method for stacking snackbars on list  |
| `off`         | excution method for removing snackbars on list   |
| `length`      | length of snackbar list        |
| `list`        | snack bar list currently being displayed on the screen     |

# Guide
1. Local option setting value is always applied before global option setting value.
   - **In the example below, the duration is set to 10, which is set locally.**
```
<SnackbarContextProvider
  id="snackbar-portal-unique-id"
  option={{ duration: 0 }}
>
  <Example />
</SnackbarContextProvider>

...
import { useSnackbar } from 'react-snackbar-ui-customizable'

const Example = (): JSX.Element => {
  const snackbar = useSnackbar();

  return (
    <button onClick={() => snackbar.on({ title: 'snackbar title', message: 'this is snackbar message', duration: 10 })}>
      Show Snackbar!
    </button>
  )
}
```