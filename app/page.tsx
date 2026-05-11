import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = parseInt(params.page || "1");
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  return <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />;
}
