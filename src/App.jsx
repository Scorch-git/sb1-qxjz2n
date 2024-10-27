import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import NewsCard from './components/NewsCard';
import TwitterPreview from './components/TwitterPreview';

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
      setArticles(response.data.Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Crypto News Summarizer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Latest Articles</h2>
            {loading ? (
              <div className="text-center py-8">Loading articles...</div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onSelect={() => setSelectedArticle(article)}
                    isSelected={selectedArticle?.id === article.id}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Twitter Preview</h2>
            {selectedArticle && (
              <TwitterPreview article={selectedArticle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;