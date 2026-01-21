import { useState, useEffect, useCallback } from 'react'
import LZString from 'lz-string'

const EXAMPLE_TAB = `e|---0-------1-------3---------|
B|-------0-------0---------0---|
G|-----------------------------|
D|-----------------------------|
A|-----------0-------2---------|
E|---3-------------------------|`

const BLANK_TAB = `e|---------------------------------|
B|---------------------------------|
G|---------------------------------|
D|---------------------------------|
A|---------------------------------|
E|---------------------------------|`

// Compress text for URL using LZ-string
const encodeTab = (text: string): string => {
  return LZString.compressToEncodedURIComponent(text)
}

// Decompress from URL
const decodeTab = (encoded: string): string => {
  try {
    const decoded = LZString.decompressFromEncodedURIComponent(encoded)
    return decoded || ''
  } catch {
    return ''
  }
}

// Get tab from hash
const getTabFromHash = (): string => {
  const hash = window.location.hash.slice(1) // Remove #
  if (hash) {
    return decodeTab(hash)
  }
  return ''
}

const TabEditor = () => {
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState(getTabFromHash)

  // Update hash when tab changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tab) {
        window.location.hash = encodeTab(tab)
      } else {
        window.location.hash = ''
      }
    }, 300) // Debounce 300ms

    return () => clearTimeout(timeoutId)
  }, [tab])

  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      setTab(getTabFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Guitar Tabber</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTab(tab ? tab + '\n\n' + BLANK_TAB : BLANK_TAB)}
            className="px-4 py-2 rounded text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            + Add Blank
          </button>
          <button
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      <textarea
        value={tab}
        onChange={(e) => setTab(e.target.value)}
        placeholder={EXAMPLE_TAB}
        className="flex-1 w-full bg-gray-800 text-gray-100 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
        style={{ minHeight: '400px' }}
        spellCheck={false}
      />

      <p className="mt-4 text-gray-500 text-sm">
        Type or paste your tab above. The URL updates automatically for sharing.
      </p>
    </div>
  )
}

export default TabEditor
