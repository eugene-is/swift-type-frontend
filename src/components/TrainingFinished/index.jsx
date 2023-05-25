import React from 'react';
import { Keyboard } from '../Keyboard';

export const TrainingFinished = ({ accuracy, speed, trainingTime, resetTraining, pressedKey }) => {
  return (
    <div>
      <p>Тренировка завершена!</p>
      <p>Точность: {accuracy}%</p>
      <p>Скорость: {speed} символов в минуту</p>
      <p>Время тренировки: {trainingTime} секунд</p>
      <button onClick={resetTraining}>Начать новую тренировку</button>
      <Keyboard pressedKey={pressedKey} />
    </div>
  );
};
