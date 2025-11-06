"use client"

import { useState } from "react";
import FileTree from "./FileTree";
import { Tree } from "../model/Tree";


const initialExplorerData: Tree = {
    id: 'root',
    name: 'My-Project-File',
    type: 'folder',
    children: [
        // {
        //     id: 'src-1',
        //     name: 'src',
        //     type: 'folder',
        //     children: [
        //         { id: 'app-2', name: 'App.jsx', type: 'file' },
        //         { id: 'index-3', name: 'index.js', type: 'file' },
        //         {
        //             id: 'comp-4',
        //             name: 'components',
        //             type: 'folder',
        //             children: [
        //                 { id: 'button-5', name: 'Button.jsx', type: 'file' },
        //                 { id: 'layout-6', name: 'Layout', type: 'folder', children: [] },
        //             ],
        //         },
        //     ],
        // },
        // { id: 'pkg-7', name: 'package.json', type: 'file' },
        // { id: 'pub-8', name: 'public', type: 'folder', children: [] },
    ],
};

export default function MainComponent() {

    const [explorerData, setExplorerData] = useState(initialExplorerData);

    const insertNode = (tree: Tree, folderId: any, itemName: string, isFolder: boolean): any => {
        if (tree.id === folderId && tree.type === 'folder') {
            const newItem = {
                id: crypto.randomUUID(), // Use a unique ID for the new item
                name: itemName,
                type: isFolder ? 'folder' : 'file',
                children: isFolder ? [] : undefined,
            };
            return { ...tree, children: [...tree.children, newItem] };
        }

        // If the current node is a folder and has children, recurse
        if (tree.children?.length) {
            const newChildren = tree.children.map((child: any) =>
                insertNode(child, folderId, itemName, isFolder)
            );
            // Only return a new object if one of the children was updated
            if (newChildren.some((child: any, index: number) => child !== tree.children[index])) {
                return { ...tree, children: newChildren };
            }
        }

        return tree; // Return the original node if no changes were made
    };

    const deleteNode = (tree: Tree, nodeIdToDelete: string): any => {
        if (tree.children) {
            let updatedChildren = [];
            let wasModified = false;

            // Iterate through children to find the node to delete or recurse
            for (const child of tree.children) {
                if (child.id === nodeIdToDelete) {
                    // Found the node to delete, skip adding it to updatedChildren
                    wasModified = true;
                    continue;
                }

                // Recurse on the child's subtree
                const result = deleteNode(child, nodeIdToDelete);
                updatedChildren.push(result);

                // Check if the recursive call modified the child's subtree
                if (result !== child) {
                    wasModified = true;
                }
            }

            if (wasModified) {
                // Return a new tree object with the updated children array
                return { ...tree, children: updatedChildren };
            }
        }

        return tree; // No changes in this subtree
    };

    const handleInsertNode = (folderId: any, itemName: string, isFolder: boolean) => {
        const updatedTree = insertNode(explorerData, folderId, itemName, isFolder);
        setExplorerData(updatedTree);
    };

    const handleDeleteNode = (nodeIdToDelete: any) => {
        // Prevent deletion if the root node itself is somehow passed
        if (nodeIdToDelete === 'root') {
            console.warn("Cannot delete the root file system.");
            return;
        }
        const updatedTree = deleteNode(explorerData, nodeIdToDelete);
        setExplorerData(updatedTree);
    };

    return (
        <FileTree 
            explorer={explorerData} 
            handleInsertNode={handleInsertNode} 
            onDelete={handleDeleteNode} // Pass the new delete handler
          />
    )
}