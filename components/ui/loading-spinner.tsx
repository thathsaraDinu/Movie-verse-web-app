export function LoadingSpinner() {
  return (
    <div className="flex justify-center min-h-screen items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}