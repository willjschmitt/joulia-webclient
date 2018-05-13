interface JQuery {
  circularProgress: (action?: string) => void

  flexslider: (options: {}) => void

  iCheck: (options: {}) => any

  owlCarousel: (options: {}) => void

  peity: (kind: string, options: {}) => void
}

interface JQueryStatic {
  snackbar: (action: string, options?: {}) => void

  toasts: (options: {}) => void
}

interface Window {
  bematadmin: any
}
