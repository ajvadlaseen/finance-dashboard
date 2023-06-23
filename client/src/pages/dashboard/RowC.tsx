import DashboardBox from '@/components/DashboardBox'

type Props = object

const RowC = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea='g'></DashboardBox>
      <DashboardBox gridArea='h'></DashboardBox>
      <DashboardBox gridArea='i'></DashboardBox>
      <DashboardBox gridArea='j'></DashboardBox>
    </>
  )
}

export default RowC
