import React, { useState, useCallback, useEffect } from 'react'
import { Link2, Zap, Shield, BarChart3, Copy, Check } from 'lucide-react'
import Header from '../components/Header'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Home = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const {user,token} = useSelector((state)=>state.auth)

  const [urlHistory, setUrlHistory] = useState([])
  const [copiedStates, setCopiedStates] = useState({})

 

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`https://urlshortner.moon-cart.shop/shortURL`, { url, userId: user._id },{
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
      },
      })
      // Update the shortUrl state when response comes
      setShortUrl(response.data.shortenedUrl) 
      
      // Add to history
      setUrlHistory(prev => [
        ...prev,
        { original: url, shortened: response.data.shortenedUrl },
      ])

      // Clear the input field
      setUrl('')
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }


  useEffect(() => {
    const fetchURLs = async () => {
      try {
        // Adjusted the dynamic path with the proper `user._id`
        const response = await axios.get(`https://urlshortner.moon-cart.shop/getURLs/${user._id}`,{
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
        },
        });
        
        // Update the state with the fetched data
        setUrlHistory(response.data.links);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchURLs(); // Call the async function inside useEffect
  }, [handleClick]); // Include `user._id` in the dependency array

  const copyToClipboard = useCallback((text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [index]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }))
      }, 2000)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shorten Your Long URLs</h2>
          <p className="text-xl mb-8">Create short, easy-to-share links in seconds</p>
          <form className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here"
                className="flex-grow px-4 py-2 rounded-md bg-[#161b22] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] text-[#c9d1d9]"
                required
              />
              <button
                type="button"
                onClick={handleClick}
                className={`px-6 py-2 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff] ${
                  loading ? 'bg-[#2ea043] cursor-not-allowed' : 'bg-[#238636] hover:bg-[#2ea043]'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Shorten'
                )}
              </button>
            </div>
          </form>
          {shortUrl && (
            <div className="mt-6 p-4 bg-[#161b22] border border-[#30363d] rounded-md">
              <p className="mb-2">Your shortened URL:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-grow px-4 py-2 rounded-md bg-[#161b22] text-[#c9d1d9] border border-[#30363d] focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(shortUrl, 'short')}
                  className="ml-2 p-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
                  aria-label="Copy shortened URL"
                >
                  {copiedStates['short'] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </section>

        <section id="features" className="mb-12 lg:ml-10 lg:mr-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Lightning Fast"
              description="Create short URLs in seconds with our optimized system."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Reliable"
              description="Your data is protected with industry-standard security measures."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Detailed Analytics"
              description="Track your link performance with comprehensive click statistics."
            />
          </div>
        </section>

        <section id="history" className="mb-12 lg:ml-10 lg:mr-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Shortened URLs</h2>
          <div className="overflow-x-auto">
          {
  urlHistory.length > 0 ? (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#161b22]">
          <th className="border border-[#30363d] p-2 text-left">Original URL</th>
          <th className="border border-[#30363d] p-2 text-left">Shortened URL</th>
          <th className="border border-[#30363d] p-2 text-left">Copy</th>
        </tr>
      </thead>
      <tbody>
        {urlHistory.map((item, index) => (
          <tr key={index} className="hover:bg-[#161b22]">
            <td className="border border-[#30363d] p-2">
              <a
                href={item.normalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline truncate block max-w-xs"
              >
                {item.normalLink}
              </a>
            </td>
            <td className="border border-[#30363d] p-2">
              <a
                href={item.shorterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline"
              >
                {item.shorterLink}
              </a>
            </td>
            <td className="border border-[#30363d] p-2">
              <button
                onClick={() => copyToClipboard(item.shorterLink, index)}
                className="p-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
                aria-label="Copy shortened URL"
              >
                {copiedStates[index] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No history</p>
  )
}

          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363d] p-4 text-center">
        <p>&copy; 2023 URLShortener. All rights reserved.</p>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-lg">
      <div className="mb-4 text-[#2ea043]">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#8b949e]">{description}</p>
    </div>
  )
}

export default Home