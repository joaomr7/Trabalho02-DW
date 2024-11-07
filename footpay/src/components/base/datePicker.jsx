import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

registerLocale("pt", pt);

function MyDatePicker({ id, onDateChanged, defaultValue = null }) {
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  useEffect(() => {
    setSelectedDate(defaultValue);
  }, [defaultValue]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChanged(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      className="form-control"
      id={id}
      placeholderText="Digite uma data"
      locale="pt"
    />
  );
}

export default MyDatePicker;