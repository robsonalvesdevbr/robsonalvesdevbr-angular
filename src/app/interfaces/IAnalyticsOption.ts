export interface AnalyticsOption {
  event: string
  category: string
  label: string
  logType: 'page_view' | 'set' | 'link'
  title?: string
}
