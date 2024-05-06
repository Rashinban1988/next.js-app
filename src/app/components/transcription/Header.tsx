export const Header = () => {

  return (
    <header className="w-full h-24 text-white">
      <div className="bg-gray-900">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="flex items-center justify-between py-4 md:py-8">
            {/* <!-- logo - start --> */}
            <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl" aria-label="logo">
              <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>

              Voice Picker
            </a>
            {/* <!-- logo - end --> */}
          </header>
        </div>
      </div>

    </header>
  )
}
