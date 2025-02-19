import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { activityLogs } from '../../data/activityLogs';
import { patientData } from '../../data/patientData';
import {
  prepareChartData,
  prepareRpeData
} from '../../helpers/sessionHelpers';
import Dashboard from '../../pages/Dashboard';

jest.mock('../../components/BarChart', () => ({
  __esModule: true,
  default: ({ data }: { data: Record<string, unknown> }) => (
    <div data-testid="mock-bar-chart">{JSON.stringify(data)}</div>
  ),
}));

jest.mock('../../components/LineChart', () => ({
  __esModule: true,
  default: ({ data }: { data: Record<string, unknown> }) => (
    <div data-testid="mock-line-chart">{JSON.stringify(data)}</div>
  ),
}));

jest.mock('../../components/PieChart', () => ({
  __esModule: true,
  default: ({ data }: { data: Record<string, unknown> }) => (
    <div data-testid="mock-pie-chart">{JSON.stringify(data)}</div>
  ),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn()
  };
});

const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/' } = {}
) => {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: route, search: '', hash: '', state: {} }]}
      initialIndex={0}
    >
      {ui}
    </MemoryRouter>
  );
};

describe('Dashboard Component', () => {
  it('renders patient details and charts (loaded state)', async () => {
    renderWithRouter(<Dashboard />);
    await waitFor(() =>
      expect(
        screen.getByText(`Name: ${patientData.firstName} ${patientData.lastName}`)
      ).toBeInTheDocument()
    );
    expect(screen.getByText(`Date of Birth: ${patientData.dateOfBirth}`)).toBeInTheDocument();
    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument();
  });

  it('calls logout and navigates when Logout is clicked', async () => {
    const navigate = jest.fn();
    const mockedUseNavigate = useNavigate as jest.Mock;
    mockedUseNavigate.mockReturnValue(navigate);

    renderWithRouter(<Dashboard />);
    await waitFor(() =>
      expect(
        screen.getByText(`Name: ${patientData.firstName} ${patientData.lastName}`)
      ).toBeInTheDocument()
    );
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    fireEvent.click(screen.getByText('Logout'));
    expect(removeItemSpy).toHaveBeenCalledWith('token');
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('matches the snapshot (loaded state)', async () => {
    const { asFragment } = renderWithRouter(<Dashboard />);
    await waitFor(() =>
      expect(
        screen.getByText(`Name: ${patientData.firstName} ${patientData.lastName}`)
      ).toBeInTheDocument()
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('passes correct data to charts', async () => {
    renderWithRouter(<Dashboard />);
    await waitFor(() =>
      expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument()
    );
    const chartData = prepareChartData(activityLogs);
    const rpeChartData = prepareRpeData(activityLogs);
    expect(screen.getByTestId('mock-bar-chart').textContent).toBe(
      JSON.stringify(chartData)
    );
    expect(screen.getByTestId('mock-line-chart').textContent).toBe(
      JSON.stringify(rpeChartData)
    );
  });
});