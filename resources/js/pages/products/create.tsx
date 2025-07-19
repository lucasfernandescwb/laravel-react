import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { CircleAlert, Terminal } from "lucide-react";
import { ReactFormState } from "react-dom/client";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new product',
        href: '/products/create'
    }
]

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new product" />
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

                    <Button type="submit">Add Product</Button>
                </form>
            </div>
        </AppLayout>
    )
}