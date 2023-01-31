interface Mark {
  [key: string]: string;
}

interface Item {
  nodeType: 'heading-3' | 'paragraph' | 'hyperlink' | 'text';
  value?: string;
  data?: {
    uri?: string;
  };
  marks?: Mark[];
  content?: Item[];
}

const createNode = (item: Item): any => {
  return {
    nodeType: item.nodeType,
    value: item.value,
    data: item.data ?? {},
    marks: item.marks ?? [],
    content: item.content?.map((o) => createNode(o))
  };
};

const createRichText = (items: Item[]) => ({
  nodeType: 'document',
  data: {},
  content: items.map((item) => createNode(item))
});

export default createRichText;
