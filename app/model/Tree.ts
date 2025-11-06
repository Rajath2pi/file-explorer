interface Tree {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children: Tree[];
}

export type { Tree };