"use client"

import { useState } from "react";
import ChevronRight from "./ChevronRight";

const FolderIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const FileIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


export default function FileTree({ explorer, handleInsertNode, onDelete }: any) {
   const [expanded, setExpanded] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [isFolder, setIsFolder] = useState(false);
  const [itemName, setItemName] = useState('');

  // Handle addition of new item
  const onAdd = (e: any) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (itemName.trim()) {
        handleInsertNode(explorer.id, itemName.trim(), isFolder);
        setShowInput(false);
        setItemName('');
      } else {
        console.error("Name cannot be empty.");
      }
    }
  };

  // Wrapper for deletion
  const handleDelete = () => {
    // Note: Folders will be deleted even if they contain children.
    onDelete(explorer.id);
  };

  // Show the input field for adding a new item
  const handleNew = (isFolderType: any) => {
    setExpanded(true); // Always expand the folder when adding an item
    setShowInput(true);
    setIsFolder(isFolderType);
    setItemName('');
  };

  if (explorer.type === 'file') {
    // Render for a File
    return (
      <div className="flex items-center space-x-2 py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors group">
        <FileIcon className="w-4 h-4 text-blue-500" />
        <span className="flex-grow">{explorer.name}</span>
        {/* Delete Button for File */}
        <button
          onClick={handleDelete}
          className="p-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete File"
        >
          -D
        </button>
      </div>
    );
  }

  // Render for a Folder (Recursive Part)
  return (
    <div className="select-none">
      {/* Folder Name and Controls */}
      <div
        className="flex items-center space-x-2 py-1 px-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="p-0.5 rounded-full hover:bg-gray-300"
        >
          <ChevronRight className={`text-gray-600 transform transition-transform ${expanded ? 'rotate-90' : 'rotate-0'}`} />
        </div>

        <FolderIcon className="w-5 h-5 text-yellow-500" />
        <span className="font-medium text-gray-800" onClick={() => setExpanded(!expanded)}>{explorer.name}</span>

        {/* Action Buttons */}
        <div className="flex space-x-1 ml-auto">
          <button
            onClick={() => handleNew(true)}
            className="p-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm"
            title="Add Folder"
          >
            +F
          </button>
          <button
            onClick={() => handleNew(false)}
            className="p-1 text-xs bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors shadow-sm"
            title="Add File"
          >
            +A
          </button>
          {/* Delete Button for Folder */}
          {explorer.id !== 'root' && ( // Prevent deleting the root folder
            <button
              onClick={handleDelete}
              className="p-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
              title="Delete Folder"
            >
              -D
            </button>
          )}
        </div>
      </div>

      {/* Children Container (Conditional Rendering) */}
      <div className={`pl-4 border-l border-gray-300 ml-3 ${expanded ? '' : 'hidden'}`}>
        {/* Input Field for New Item */}
        {showInput && (
          <div className="flex items-center space-x-2 py-1 text-sm">
            <div className='p-0.5 w-4 h-4'></div> {/* Spacer */}
            {isFolder ? <FolderIcon className="w-4 h-4 text-yellow-500" /> : <FileIcon className="w-4 h-4 text-blue-500" />}
            <input
              type="text"
              className="px-2 py-0.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm flex-grow"
              autoFocus
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={onAdd}
              onBlur={() => setShowInput(false)}
              placeholder={`Enter ${isFolder ? 'folder' : 'file'} name...`}
            />
            <button
              onClick={onAdd}
              className="p-1 text-xs bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Add
            </button>
          </div>
        )}

        {/* Recursive Rendering of Children */}
        {explorer.children.map((child: any) => (
          <FileTree key={child.id} explorer={child} handleInsertNode={handleInsertNode} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};