import React from 'react';

function NewsCard({ article, onSelect, isSelected }) {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${
        isSelected ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex space-x-4">
        <img
          src={article.imageurl}
          alt={article.title}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{article.title}</h3>
          <p className="text-sm text-gray-600 mt-2">
            {article.source} • {new Date(article.published_on * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;