import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  /* Hide scrollbar for Chrome, Safari and Opera */
  #snackbar-portal::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  #snackbar-portal {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`
