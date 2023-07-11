import s from './messagesearch.module.scss';
const Search = () => {

  return (
    <div className={s.container}>
        <form>
        <input type="text" id="name" name="name"/>
        <input type="submit" value="조회"/>
        </form>
    </div>
  );
};
export default Search;