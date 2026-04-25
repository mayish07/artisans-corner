// CSS Skeleton Loader Component
export function Skeleton({ className = '', animate = true }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded ${animate ? 'animate-pulse' : ''} ${className}`} />
  );
}

// Product Detail Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="grid grid-cols-4 gap-4 mt-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-20 rounded-lg" />)}
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-12 w-40 mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <Skeleton className="w-24 h-24 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-32 rounded" />
      </div>
    </div>
  );
}

// Product Table Row Skeleton
export function ProductTableRowSkeleton() {
  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-6 py-4"><Skeleton className="h-12 w-12 rounded-lg" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
      <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
    </tr>
  );
}