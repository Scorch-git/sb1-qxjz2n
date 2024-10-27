import React, { useState, useEffect } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

function TwitterPreview({ article }) {
  const [tweet, setTweet] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (article) {
      // Extract mentioned sources from the article body
      const mentions = extractMentions(article.body);
      
      // Create tweet with title, link, and mentions
      const tweetText = generateTweet(article.title, article.url, mentions);
      setTweet(tweetText);
    }
  }, [article]);

  const extractMentions = (text) => {
    // Simple regex to find Twitter handles in the text
    const matches = text.match(/@[\w]+/g) || [];
    return [...new Set(matches)]; // Remove duplicates
  };

  const generateTweet = (title, url, mentions) => {
    const maxLength = 280;
    const urlLength = 23; // Twitter t.co URL length
    const mentionsText = mentions.join(' ');
    
    let tweetText = title;
    if (tweetText.length + urlLength + mentionsText.length + 2 > maxLength) {
      tweetText = tweetText.substring(0, maxLength - urlLength - mentionsText.length - 5) + '...';
    }
    
    return `${tweetText}\n\n${url} ${mentionsText}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tweet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Tweet Preview</h3>
        <button
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <ClipboardDocumentIcon className="h-5 w-5" />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 font-sans">
        <p className="whitespace-pre-wrap text-gray-800">{tweet}</p>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Character count: {tweet.length}/280
        </p>
      </div>
    </div>
  );
}

export default TwitterPreview;