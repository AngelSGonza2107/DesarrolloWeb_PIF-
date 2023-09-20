import Navbar from "../componentes/Navbar";

export default function DefaultLayout(props) {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        { props.children }
      </main>
    </>
  )
}