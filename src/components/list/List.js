const List = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <li>{item.title}</li>
      ))}
    </>
  );
};

export default List;
