import DashboardBox from '@/components/DashboardBox'

type Props = object

const RowB = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea='d'></DashboardBox>
      <DashboardBox gridArea='e'></DashboardBox>
      <DashboardBox gridArea='f'></DashboardBox>
    </>
  )
}

export default RowB
