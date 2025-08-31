
const CoverLetter = async ({ params }) => {
    const { id } = await params.id;
  return (
    <div>
      <h1>CoverLetter: {id}</h1>
    </div>
  )
}

export default CoverLetter
