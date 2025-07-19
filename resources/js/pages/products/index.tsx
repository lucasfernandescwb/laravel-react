import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PageProps, Product } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Megaphone } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products'
    }
]

export default function Index() {

    const { products, flash } = usePage().props as unknown as PageProps

    const { processing, delete: destroy } = useForm();

    const handleDelete = (product: Product) => {

        if (confirm(`Do you want to delete a product - ${product.id}. ${product.name}?`)) {
            destroy(route('products.destroy', product.id));
        }
        
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    {flash.message && (
                        <Alert>
                            <Megaphone className="h-4 w-4" />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <Link href={route('products.create')}>
                    <Button>Create a product</Button>
                </Link>

                {products.length > 0 && (

                    <div>
                        <Table>
                            <TableCaption>A list of your recent products</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.id}</TableCell>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>{p.description}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Link href={route('products.edit', p.id)}>
                                                <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
                                            </Link>
                                            <Button disabled={processing} onClick={() => handleDelete(p)} className="bg-red-500 hover:bg-red-700">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}