class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

import LinkList from '@/store/linkList.js';
const linkList = new LinkList();

const newLinks = [
  { name: 'Alphabet0', url: 'http://abc.xyz0' },
  { name: 'Alphabet1', url: 'http://abc.xyz1' },
  { name: 'Alphabet2', url: 'http://abc.xyz2' },
  { name: 'Alphabet3', url: 'http://abc.xyz3' },
  { name: 'Alphabet4', url: 'http://abc.xyz4' },
  { name: 'Alphabet5', url: 'http://abc.xyz5' }
];

describe('Link List', () => {
  it('get list', () => {
    const defaultList = [];
    const list = linkList.getList();
    expect(list).toEqual(defaultList);
  });

  it('add link', () => {
    const [name, url] = ['Alphabet', 'http://abc.xyz'];
    linkList.addLink(name, url);
    const list = linkList.getList();
    expect(list[0].name).toMatch(name);
  });

  it('remove link', () => {
    const list = linkList.getList();
    const id = list[0].id;
    linkList.removeLink(id);
    const removedList = linkList.getList();
    expect(removedList).toEqual([]);
  });

  it('add multi link', () => {
    const newListLink = new LinkList();
    newLinks.forEach(({ name, url }) => newListLink.addLink(name, url));
    const newList = newListLink.getList();
    expect(newList).toHaveLength(6);
  });

  it('up vote', () => {
    const list = linkList.getList();
    const id = list[0].id;
    linkList.upVote(id);
    const afterUpVote = linkList.getList();
    expect(afterUpVote[0].vote).toEqual(1);
  });

  it('down vote', () => {
    const list = linkList.getList();
    const id = list[0].id;
    linkList.downVote(id);
    const afterDownVote = linkList.getList();
    expect(afterDownVote[0].vote).toEqual(0);
  });
});
