import { VictoryPie, VictoryTooltip } from 'victory-native'

interface PieProps {
  data: Array<{
    x: any
    y: number
  }>
}

const categories = {
  salary: {
    name: 'Salario',
    color: {
      accent: '#00A86B'
    }
  },
  transport: {
    name: 'Transporte',
    color: {
      accent: '#0077FF'
    }
  },
  food: {
    name: 'Comida',
    color: {
      accent: '#FD3C4A'
    }
  },
  subscription: {
    name: 'Inscrição',
    color: {
      accent: '#7F3DFF'
    }
  },
  shopping: {
    name: 'Shopping',
    color: {
      accent: '#FCAC12'
    }
  }
}

export function Pie ({ data }: PieProps) {
  return (
    <VictoryPie
      height={200}
      innerRadius={80}
      colorScale={data.map<any>(d => {
        const color = Object.values(categories).find(category => category.name.includes(d.x)) ?? { color: { accent: '#91919F' } }
        return color?.color.accent
      })}
      data={data}
      style={{
        labels: {
          fill: '#7F3DFF',
          fontWeight: 700
        }
      }}
      labelComponent={
        <VictoryTooltip
          renderInPortal={false}
          flyoutStyle={{
            stroke: 0,
            fill: '#FCFCFC'
          }}
        />
      }
      animate={{
        duration: 2000
      }}
    />
  )
}
