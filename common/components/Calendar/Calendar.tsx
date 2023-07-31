import { ThemeProvider } from "@emotion/react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { theme } from "common/components/Calendar/theme";
import { StyledTitle } from "../Formik/Formik.styled";
import customParseFormat from "dayjs/plugin/customParseFormat";

type CalendarProps = {
  date: string;
  setFieldValue: (field: string, value: unknown) => void;
};

const Calendar = ({ date, setFieldValue }: CalendarProps) => {
  dayjs.extend(customParseFormat);
  let birthDate = dayjs();
  if (date) {
    birthDate = dayjs(date, "DD-MM-YYYY");
  }

  return (
    <>
      <StyledTitle>
        <span>Date of birthday</span>
      </StyledTitle>
      <ThemeProvider theme={theme}>
        <DatePicker
          value={birthDate}
          format={"DD/MM/YYYY"}
          disableFuture={true}
          onChange={(newValue) => {
            const date = newValue?.format("DD/MM/YYYY");
            setFieldValue("birthday", date);
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default Calendar;
