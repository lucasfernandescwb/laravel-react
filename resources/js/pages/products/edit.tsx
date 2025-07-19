import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Product } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { CircleAlert } from "lucide-react";

interface Props {
    product: Product;
}

export default function Edit({ product } : Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price.toString(),
        description: product.description
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('products.update', product.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a product', href: `/products/${product.id}/edit`}]}>
            <Head title="Update a product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form onSubmit={handleSubmit} className="sm:w-8/12 space-y-4">

                    {/* Display error */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div>
                        <Label className="block mb-2" htmlFor="product name">Name</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Product Name" />
                    </div>

                    <div>
                        <Label className="block mb-2" htmlFor="product price">Price</Label>
                        <Input value={data.price} onChange={(e) => setData('price', e.target.value)} placeholder="Price" />
                    </div>

                    <div>
                        <Label className="block mb-2" htmlFor="product description">Description</Label>
                        <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" rows={4} />
                    </div>

                    <Button disabled={processing} type="submit">Edit Product</Button>
                </form>
            </div>
        </AppLayout>
    )
}