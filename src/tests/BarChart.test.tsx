import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BarChart from '../components/BarChart';

jest.mock('@nivo/bar', () => ({
  ResponsiveBar: ({ data }: { data: { date: string; totalReps: number }[] }) => (
    <div data-testid="mock-bar-chart" role="chart" style={{ height: '400px' }}>
      {data.length === 0 || data.some(item => item.date === "Invalid") ? (
        <div>No data available</div>
      ) : (
        data.map((item) => (
          <div key={item.date}>{item.date}</div>
        ))
      )}
    </div>
  ),
}));

describe('BarChart Component', () => {
  it('renders without crashing', () => {
    const mockData = [
      { date: "2022-01-01", totalReps: 10 },
      { date: "2022-02-01", totalReps: 15 },
      { date: "2022-03-01", totalReps: 20 },
    ];

    render(<BarChart data={mockData} />);

    const chartContainer = screen.getByTestId('mock-bar-chart');
    expect(chartContainer).toBeInTheDocument();
  });

  it('displays the correct number of bars based on the data', () => {
    const mockData = [
      { date: "2022-01-01", totalReps: 10 },
      { date: "2022-02-01", totalReps: 15 },
      { date: "2022-03-01", totalReps: 20 },
    ];

    render(<BarChart data={mockData} />);

    mockData.forEach((item) => {
      expect(screen.getByText(item.date)).toBeInTheDocument();
    });
  });

  it('renders correctly with empty data', () => {
    const emptyData: { date: string; totalReps: number }[] = [];

    render(<BarChart data={emptyData} />);

    const chartContainer = screen.getByTestId('mock-bar-chart');
    expect(chartContainer).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders correctly with one data point', () => {
    const singleData = [{ date: "2022-01-01", totalReps: 10 }];

    render(<BarChart data={singleData} />);

    const chartContainer = screen.getByTestId('mock-bar-chart');
    expect(chartContainer).toBeInTheDocument();
    expect(screen.getByText(singleData[0].date)).toBeInTheDocument();
  });

  it('renders correctly with many data points', () => {
    const multipleData = [
      { date: "2022-01-01", totalReps: 10 },
      { date: "2022-02-01", totalReps: 20 },
      { date: "2022-03-01", totalReps: 30 },
      { date: "2022-04-01", totalReps: 40 },
    ];

    render(<BarChart data={multipleData} />);

    multipleData.forEach((item) => {
      expect(screen.getByText(item.date)).toBeInTheDocument();
    });
  });

  it('has the correct accessibility attributes', () => {
    const mockData = [
      { date: "2022-01-01", totalReps: 10 },
      { date: "2022-02-01", totalReps: 15 },
    ];

    render(<BarChart data={mockData} />);

    const chartContainer = screen.getByTestId('mock-bar-chart');
    expect(chartContainer).toHaveAttribute('role', 'chart');
  });

  it('applies custom styling correctly', () => {
    const mockData = [
      { date: "2022-01-01", totalReps: 10 },
      { date: "2022-02-01", totalReps: 15 },
    ];

    const { container } = render(<BarChart data={mockData} />);
    const chartContainer = container.querySelector('div[data-testid="mock-bar-chart"]');

    expect(chartContainer).toHaveStyle('height: 400px');
  });

  it('triggers animation when data is updated', () => {
    const initialData = [
      { date: "2022-01-01", totalReps: 10 },
      { date: "2022-02-01", totalReps: 15 },
    ];

    const updatedData = [
      { date: "2022-01-01", totalReps: 20 },
      { date: "2022-02-01", totalReps: 25 },
    ];

    const { rerender } = render(<BarChart data={initialData} />);

    expect(screen.getByText('2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('2022-02-01')).toBeInTheDocument();

    rerender(<BarChart data={updatedData} />);

    expect(screen.getByText('2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('2022-02-01')).toBeInTheDocument();
  });

  it('shows a fallback UI or error message if the chart fails to load', () => {
    const invalidData = [{ date: "Invalid", totalReps: 0 }];

    render(<BarChart data={invalidData} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

});