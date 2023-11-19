'use client';

import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarView() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className=" rounded-lg border-2">
      <header>{/* <h1>your events</h1> */}</header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar onChange={onChange} value={value} />
        </main>
      </div>
    </div>
  );
}
