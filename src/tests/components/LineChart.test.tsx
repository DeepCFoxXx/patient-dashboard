import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LineChart from '../../components/LineChart';

jest.mock('@nivo/line', () => ({
  ResponsiveLine: ({ data }: { data: { id: string; data: { x: string; y: number }[] }[] }) => (
    <div data-testid="mock-line-chart" role="chart" style={{ height: '400px' }}>
      {data.length === 0 ? (
        <div>No data available</div>
      ) : (
        data.map((series) =>
          series.data.map((point) => (
            <div key={`${series.id}-${point.x}`}>
              {point.x}: {point.y}
            </div>
          ))
        )
      )}
    </div>
  ),
}));

describe('LineChart Component', () => {
  it('renders without crashing', () => {
    const mockData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 10 },
          { x: '2022-02-01', y: 15 },
          { x: '2022-03-01', y: 20 },
        ],
      },
    ];

    render(<LineChart data={mockData} />);

    const chartContainer = screen.getByTestId('mock-line-chart');
    expect(chartContainer).toBeInTheDocument();
  });

  it('displays the correct data points', () => {
    const mockData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 10 },
          { x: '2022-02-01', y: 15 },
          { x: '2022-03-01', y: 20 },
        ],
      },
    ];

    render(<LineChart data={mockData} />);

    mockData[0].data.forEach((point) => {
      expect(screen.getByText(`${point.x}: ${point.y}`)).toBeInTheDocument();
    });
  });

  it('renders correctly with empty data', () => {
    const emptyData: { id: string; data: { x: string; y: number }[] }[] = [];

    render(<LineChart data={emptyData} />);

    const chartContainer = screen.getByTestId('mock-line-chart');
    expect(chartContainer).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders correctly with one data point', () => {
    const singleData = [
      {
        id: 'series1',
        data: [{ x: '2022-01-01', y: 10 }],
      },
    ];

    render(<LineChart data={singleData} />);

    const chartContainer = screen.getByTestId('mock-line-chart');
    expect(chartContainer).toBeInTheDocument();
    expect(screen.getByText('2022-01-01: 10')).toBeInTheDocument();
  });

  it('renders correctly with many data points', () => {
    const multipleData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 10 },
          { x: '2022-02-01', y: 20 },
          { x: '2022-03-01', y: 30 },
          { x: '2022-04-01', y: 40 },
        ],
      },
    ];

    render(<LineChart data={multipleData} />);

    multipleData[0].data.forEach((point) => {
      expect(screen.getByText(`${point.x}: ${point.y}`)).toBeInTheDocument();
    });
  });

  it('has the correct accessibility attributes', () => {
    const mockData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 10 },
          { x: '2022-02-01', y: 15 },
        ],
      },
    ];

    render(<LineChart data={mockData} />);

    const chartContainer = screen.getByTestId('mock-line-chart');
    expect(chartContainer).toHaveAttribute('role', 'chart');
  });

  it('applies custom styling correctly', () => {
    const mockData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 10 },
          { x: '2022-02-01', y: 15 },
        ],
      },
    ];

    const { container } = render(<LineChart data={mockData} />);
    const chartContainer = container.querySelector('div[data-testid="mock-line-chart"]');

    expect(chartContainer).toHaveStyle('height: 400px');
  });

  it('triggers animation when data is updated', () => {
    const initialData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 10 },
          { x: '2022-02-01', y: 15 },
        ],
      },
    ];

    const updatedData = [
      {
        id: 'series1',
        data: [
          { x: '2022-01-01', y: 20 },
          { x: '2022-02-01', y: 25 },
        ],
      },
    ];

    const { rerender } = render(<LineChart data={initialData} />);

    expect(screen.getByText('2022-01-01: 10')).toBeInTheDocument();
    expect(screen.getByText('2022-02-01: 15')).toBeInTheDocument();

    rerender(<LineChart data={updatedData} />);

    expect(screen.getByText('2022-01-01: 20')).toBeInTheDocument();
    expect(screen.getByText('2022-02-01: 25')).toBeInTheDocument();
  });

});