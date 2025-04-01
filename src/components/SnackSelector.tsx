
import { useState } from 'react';
import { Snack, SnackOrder } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MinusCircle, PlusCircle, Coffee, Pizza, Popcorn } from 'lucide-react';

// Mock snacks data
const snacks: Snack[] = [
  {
    id: "1",
    name: "Large Popcorn",
    description: "Freshly popped buttery popcorn (large)",
    price: 250,
    image: "https://www.pngall.com/wp-content/uploads/2016/07/Popcorn-PNG-HD.png",
    category: "Popcorn"
  },
  {
    id: "2",
    name: "Medium Popcorn",
    description: "Freshly popped buttery popcorn (medium)",
    price: 180,
    image: "https://www.pngall.com/wp-content/uploads/2016/07/Popcorn-PNG-HD.png",
    category: "Popcorn"
  },
  {
    id: "3",
    name: "Cheese Popcorn",
    description: "Popcorn with cheese flavor",
    price: 280,
    image: "https://www.pngall.com/wp-content/uploads/2016/07/Popcorn-Download-PNG.png",
    category: "Popcorn"
  },
  {
    id: "4",
    name: "Cola (Large)",
    description: "Refreshing cola (large)",
    price: 180,
    image: "https://www.pngitem.com/pimgs/m/45-458120_soft-drink-png-transparent-png.png",
    category: "Beverage"
  },
  {
    id: "5",
    name: "Cola (Medium)",
    description: "Refreshing cola (medium)",
    price: 120,
    image: "https://www.pngitem.com/pimgs/m/45-458120_soft-drink-png-transparent-png.png",
    category: "Beverage"
  },
  {
    id: "6",
    name: "Nachos with Cheese",
    description: "Crispy nachos with melted cheese",
    price: 230,
    image: "https://pngimg.com/d/nachos_PNG9.png",
    category: "Snack"
  },
  {
    id: "7",
    name: "Combo 1: Popcorn + Cola",
    description: "Medium popcorn with medium cola",
    price: 280,
    image: "https://pngimg.com/d/popcorn_PNG62.png",
    category: "Combo"
  },
  {
    id: "8",
    name: "Combo 2: Nachos + Cola",
    description: "Nachos with medium cola",
    price: 320,
    image: "https://pngimg.com/d/nachos_PNG9.png",
    category: "Combo"
  }
];

interface SnackSelectorProps {
  onSnacksSelected: (snacks: SnackOrder[]) => void;
  selectedSnacks?: SnackOrder[];
}

const SnackSelector = ({ onSnacksSelected, selectedSnacks = [] }: SnackSelectorProps) => {
  const [orders, setOrders] = useState<SnackOrder[]>(selectedSnacks);
  
  const getSnackIcon = (category: string) => {
    switch (category) {
      case "Popcorn":
        return <Popcorn className="h-5 w-5 text-amber-500" />;
      case "Beverage":
        return <Coffee className="h-5 w-5 text-blue-500" />;
      case "Combo":
      case "Snack":
      default:
        return <Pizza className="h-5 w-5 text-red-500" />;
    }
  };
  
  const handleAddSnack = (snack: Snack) => {
    const existing = orders.find(order => order.snackId === snack.id);
    
    if (existing) {
      setOrders(orders.map(order => 
        order.snackId === snack.id 
          ? { ...order, quantity: order.quantity + 1 } 
          : order
      ));
    } else {
      setOrders([...orders, { 
        snackId: snack.id, 
        quantity: 1, 
        price: snack.price 
      }]);
    }
  };
  
  const handleRemoveSnack = (snackId: string) => {
    const existing = orders.find(order => order.snackId === snackId);
    
    if (existing && existing.quantity > 1) {
      setOrders(orders.map(order => 
        order.snackId === snackId 
          ? { ...order, quantity: order.quantity - 1 } 
          : order
      ));
    } else {
      setOrders(orders.filter(order => order.snackId !== snackId));
    }
  };
  
  const getOrderQuantity = (snackId: string) => {
    const order = orders.find(order => order.snackId === snackId);
    return order ? order.quantity : 0;
  };
  
  const getTotalAmount = () => {
    return orders.reduce((total, order) => {
      const snack = snacks.find(s => s.id === order.snackId);
      return total + (snack ? snack.price * order.quantity : 0);
    }, 0);
  };
  
  const handleConfirm = () => {
    onSnacksSelected(orders);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-red-600">Add Snacks & Beverages</h2>
      
      <ScrollArea className="h-[350px] mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {snacks.map(snack => {
            const quantity = getOrderQuantity(snack.id);
            
            return (
              <Card key={snack.id} className={`border overflow-hidden relative ${quantity > 0 ? 'border-red-200 bg-red-50/50' : 'border-gray-200'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getSnackIcon(snack.category)}
                      <CardTitle className="text-base">{snack.name}</CardTitle>
                    </div>
                    <div className="text-red-600 font-bold">₹{snack.price}</div>
                  </div>
                  <CardDescription className="text-xs">{snack.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 pb-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full border-red-200"
                      onClick={() => handleRemoveSnack(snack.id)}
                      disabled={quantity === 0}
                    >
                      <MinusCircle className="h-4 w-4 text-red-500" />
                    </Button>
                    <span className={`w-6 text-center font-medium ${quantity > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {quantity}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full border-red-200"
                      onClick={() => handleAddSnack(snack)}
                    >
                      <PlusCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="mb-4 border-t border-b py-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Snacks Total</span>
          <span className="text-red-600">₹{getTotalAmount()}</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleConfirm}
          className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
        >
          {orders.length > 0 ? `Add ${orders.length} items to booking` : 'Skip Snacks'}
        </Button>
      </div>
    </div>
  );
};

export default SnackSelector;
