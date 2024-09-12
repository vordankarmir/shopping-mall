var bulk = db.categories.initializeUnorderedBulkOp();

bulk.insert({
  _id: '71430666-389c-43b8-a522-534c8eda356d',
  title: 'meat',
  description: 'meat category',
});
bulk.insert({
  _id: 'e7220b6e-8867-4f59-a968-499ce0eb078b',
  title: 'cheese',
  description: 'cheese category',
});
bulk.insert({
  _id: '25705132-0300-4a9a-94c7-b2d000dd30ed',
  title: 'bread',
  description: 'bread category',
});
bulk.insert({
  _id: '5ea5af46-731b-495b-bace-e434d0576d52',
  title: 'soda',
  description: 'soda category',
});
bulk.insert({
  _id: '91b7b453-695e-4970-ac12-877ed6f5626e',
  title: 'egg',
  description: 'egg category',
});
bulk.execute();
