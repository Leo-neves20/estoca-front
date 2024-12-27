// Query.Pagination = <TData>({
//     url,
//     searchParamsKeys,
//     enable = true,
//   }: Pagination): PaginationResponse<TData> => {
//     const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
//     const [size, setSize] = useQueryState('size', parseAsInteger.withDefault(10));
//     const [hasMore, setHasMore] = useQueryState(
//       'hasMore',
//       parseAsBoolean.withDefault(false),
//     );
//     const [total, setTotal] = useQueryState(
//       'total',
//       parseAsInteger.withDefault(0),
//     );

//     const [fullUrl, setFulUrl] = useState<string | null>(null);

//     const queryKey = [searchParamsKeys, fullUrl];

//     if (typeof window === 'object') {
//       localStorage.setItem('table-key', JSON.stringify(queryKey));
//     }

//     const router = useRouter();

//     const query = useQuery<generics.iTableInformations<TData>>({
//       queryKey,
//       queryFn: () =>
//         handleFetch({
//           urlParams: fullUrl as string,
//           method: 'get',
//         }),
//       enabled: Boolean(fullUrl) && enable,
//     }) as BaseResponse<generics.iTableInformations<TData>>;

//     type paginationLoacalStorage = {
//       pathName: string;
//       fullUrl: string;
//     };

//     useEffect(() => {
//       const cacheUrl: paginationLoacalStorage | null = JSON.parse(
//         localStorage.getItem('paginationData') ?? '{}',
//       );

//       if (
//         cacheUrl &&
//         !router.query.page &&
//         cacheUrl.pathName === router.pathname
//       ) {
//         setFulUrl(cacheUrl.fullUrl);
//         return;
//       }

//       const search = new URLSearchParams();

//       Object.entries(router.query).forEach(([key, value]) => {
//         if (searchParamsKeys.includes(key)) {
//           search.append(key, String(value));
//         }
//       });

//       search.append('page', String(page));
//       search.append('size', String(size));

//       const newUrl = `${url}?${search.toString()}`;

//       if (newUrl !== fullUrl) {
//         setFulUrl(`${url}?${search.toString()}`);

//         const paginationData = JSON.stringify({
//           pathName: router.pathname,
//           fullUrl: newUrl,
//         });

//         localStorage.setItem('paginationData', paginationData);
//       }
//     }, [page, size, queryKey]);

//     useEffect(() => {
//       if (!query.data) return;

//       if (!router.query.page) {
//         setPage(Number(query.data.page));
//         setSize(Number(query.data.size));
//       }

//       setHasMore(query.data.has_more);
//       setTotal(query.data.total);
//     }, [query.isSuccess, query.data, query.isLoading]);

//     return {
//       tableData: query.data,
//       isLoading: query.isFetching,
//       hasMore: hasMore,
//       total: total,
//       url: fullUrl,
//     };
//   };
