import Blackbutton from 'components/button/Blacbutton';
import { useForm } from 'react-hook-form';
import './Regist.scss';
// const useridRef = useRef(null);

const Star = () => {
  return (
    <span className="star" title="필수사항">
      *
    </span>
  );
};

const Input = (id, placeholder, tab, ref, maxLength, pattern) => {
  const { register } = useForm({ mode: 'onChange' });

  return (
    <div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        tabIndex={tab}
        ref={ref}
        maxLength={maxLength}
        {...register(id, pattern)}
      />
    </div>
  );
};

const Inputmodule = ({ id, text, errormessage }) => {
  return (
    <tr>
      <th>
        <label htmlFor={id}>{text}</label>
        <Star />
      </th>
      <td>
        <Input />
        <Blackbutton />
        {errormessage}
      </td>
    </tr>
  );
};

export default Inputmodule;
