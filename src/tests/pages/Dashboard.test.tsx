import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { activityLogs } from '../../data/activityLogs';
import { patientData } from '../../data/patientData';
import { calculateAverages, convertSecondsToHMS, prepareChartData, prepareRpeData, processSessionData } from '../../helpers/sessionHelpers';
import Dashboard from '../../pages/Dashboard';

jest.mock('../../components/BarChart', () => ({
  __esModule: true,
  default: ({ data }: { data: Record<string, unknown> }) => <div data-testid="mock-bar-chart">{JSON.stringify(data)}</div>,
}));

jest.mock('../../components/LineChart', () => ({
  __esModule: true,
  default: ({ data }: { data: Record<string, unknown> }) => <div data-testid="mock-line-chart">{JSON.stringify(data)}</div>,
}));

jest.mock('../../components/PieChart', () => ({
  __esModule: true,
  default: ({ data }: { data: Record<string, unknown> }) => <div data-testid="mock-pie-chart">{JSON.stringify(data)}</div>,
}));

describe('Dashboard Component', () => {
  it('renders loading state initially', () => {
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [null, jest.fn()])
      .mockImplementationOnce(() => [[], jest.fn()])
      .mockImplementationOnce(() => [true, jest.fn()])
      .mockImplementationOnce(() => [null, jest.fn()]);

    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [null, jest.fn()])
      .mockImplementationOnce(() => [[], jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => ['Failed to load data', jest.fn()]);

    render(<Dashboard />);
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  it('renders patient details and charts', () => {
    render(<Dashboard />);

    const sessionData = processSessionData(activityLogs);
    const { averageDuration, averageReps, averageRpe } = calculateAverages(sessionData);
    const formattedAverageDuration = convertSecondsToHMS(averageDuration);

    expect(screen.getByText(`Name: ${patientData.firstName} ${patientData.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(`Date of Birth: ${patientData.dateOfBirth}`)).toBeInTheDocument();
    expect(screen.getByText(`Average Reps Per Session: ${Math.round(averageReps)} reps`)).toBeInTheDocument();
    expect(screen.getByText(`Average Therapy Duration: ${formattedAverageDuration}`)).toBeInTheDocument();
    expect(screen.getByText(`Average RPE Per Session: ${averageRpe.toFixed(2)}`)).toBeInTheDocument();

    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
  });

  it('renders correctly with empty activity logs', () => {
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [patientData, jest.fn()])
      .mockImplementationOnce(() => [[], jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [null, jest.fn()]);

    render(<Dashboard />);

    expect(screen.getByText(`Name: ${patientData.firstName} ${patientData.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(`Date of Birth: ${patientData.dateOfBirth}`)).toBeInTheDocument();
    expect(screen.getByText('Average Reps Per Session: 0 reps')).toBeInTheDocument();
    expect(screen.getByText('Average Therapy Duration: 0h 0m 0s')).toBeInTheDocument();
    expect(screen.getByText('Average RPE Per Session: 0.00')).toBeInTheDocument();
  });

  it('renders correctly with loaded data', () => {
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [patientData, jest.fn()])
      .mockImplementationOnce(() => [activityLogs, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [null, jest.fn()]);

    render(<Dashboard />);

    const sessionData = processSessionData(activityLogs);
    const { averageDuration, averageReps, averageRpe } = calculateAverages(sessionData);
    const formattedAverageDuration = convertSecondsToHMS(averageDuration);

    expect(screen.getByText(`Name: ${patientData.firstName} ${patientData.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(`Date of Birth: ${patientData.dateOfBirth}`)).toBeInTheDocument();
    expect(screen.getByText(`Average Reps Per Session: ${Math.round(averageReps)} reps`)).toBeInTheDocument();
    expect(screen.getByText(`Average Therapy Duration: ${formattedAverageDuration}`)).toBeInTheDocument();
    expect(screen.getByText(`Average RPE Per Session: ${averageRpe.toFixed(2)}`)).toBeInTheDocument();

    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
  });

  it('passes correct data to charts', () => {
    render(<Dashboard />);

    const chartData = prepareChartData(activityLogs);
    const rpeChartData = prepareRpeData(activityLogs);

    expect(screen.getByTestId('mock-bar-chart').textContent).toBe(JSON.stringify(chartData));
    expect(screen.getByTestId('mock-line-chart').textContent).toBe(JSON.stringify(rpeChartData));
  });
});
