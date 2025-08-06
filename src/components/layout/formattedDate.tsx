const FormattedDate = ({date}: {date: string}) => {
  const time = new Date(date + "T00:00:00").toLocaleString("pt-BR", {
    timeZone: "America/Bahia",
    dateStyle: "full"
  })

  return (
    <div>{time}</div>
  )
}

export default FormattedDate