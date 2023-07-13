import s from "./tags.module.scss";

const Tags = ({ setSelectedTags, selectedTags, text }) => {
  const tags = ["DJANGO", "SPRING", "JAVASCRIPT", "JAVA", "PYTHON", "CPP", "REACT", "AWS"];
  const clickTag = (tag) => {
    //NOTE 기술 테그
    if (selectedTags.tags.includes(tag)) {
      setSelectedTags({
        ...selectedTags,
        tags: selectedTags.tags.filter((selectedTag) => selectedTag !== tag),
      });
    } else {
      setSelectedTags({
        ...selectedTags,
        tags: [...selectedTags.tags, tag],
      });
    }
  };

  return (
    <>
      <label>{text}</label>
      <div className={s.tagalign}>
        <div className={s.tags}>
          {tags.map((item, index) => (
            <span key={index} onClick={() => clickTag(item)} className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tags;
