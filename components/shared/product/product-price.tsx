'use client';
import { cn, formatCurrency } from '@/lib/utils';

interface ProductPriceProps {
  price: number;
  className?: string;
  listPrice?: number;
  isDeal?: boolean;
  forListing?: boolean;
  plain?: boolean;
}

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: ProductPriceProps) => {
  const discountPercent = listPrice > 0 
    ? Math.round(100 - (price / listPrice) * 100)
    : 0;

  const stringValue = price.toString();
  const [intValue, floatValue] = stringValue.includes('.') 
    ? stringValue.split('.')
    : [stringValue, ''];

  if (plain) {
    return <>{formatCurrency(price)}</>;
  }

  return (
    <div className="space-y-2">
      {listPrice > 0 && (
        <div className={cn(
          'text-muted-foreground text-xs py-2',
          forListing && 'text-center'
        )}>
          List price:{' '}
          <span className="line-through">{formatCurrency(listPrice)}</span>
        </div>
      )}

      {isDeal ? (
        <div className="space-y-2">
          <div className="flex justify-center items-center gap-2">
            <span className="bg-red-700 rounded-sm p-1 text-white text-sm font-semibold">
              {discountPercent}% OFF
            </span>
            <span className="text-red-700 text-xs font-bold">
              Limited time deal
            </span>
          </div>
          <div className={cn(
            'flex items-center gap-2',
            forListing && 'justify-center'
          )}>
            <div className={cn('text-3xl', className)}>
              <span className="text-xs align-super">$</span>
              {intValue}
              {floatValue && (
                <span className="text-xs align-super">.{floatValue}</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={cn(
          'flex items-center gap-3',
          forListing && 'justify-center'
        )}>
          {discountPercent > 0 && (
            <div className="text-orange-700 text-sm">
              {discountPercent}% OFF
            </div>
          )}
          <div className={cn('text-3xl', className)}>
            <span className="text-xs align-super">$</span>
            {intValue}
            {floatValue && (
              <span className="text-xs align-super">.{floatValue}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;