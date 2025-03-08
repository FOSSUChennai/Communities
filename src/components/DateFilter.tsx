interface DateFilterProps {
  events: { date: string }[];
  DateChange: (date: string) => void;
  date: string;
}

const DateFilter: React.FC<DateFilterProps> = ({ DateChange, date }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    DateChange(e.target.value);
    return e.target.value;
  };

  return <input type='date' value={date} onChange={handleChange} />;
};

export default DateFilter;
