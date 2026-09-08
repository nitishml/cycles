import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const MultiFactorAuth = () => {
    return (

        <Card className='border-0 shadow-none bg-background'>
            <CardHeader className='px-0'>
                <CardTitle><h1 className="text-2xl font-semibold">Multi-factor authentication</h1></CardTitle>
            </CardHeader>
            <CardContent className='px-0 space-y-4'>
                <p className='text-muted-foreground'>Multi-factor authentication is not enabled yet.</p>
                <p className='text-sm text-muted-foreground'>
                    Multi-factor authentication adds an additional layer of security to your account by requiring more than just a
                    password to log in.{' '}
                    <a href='#' className='text-primary hover:underline'>
                        Learn more
                    </a>
                    .
                </p>
                <Button disabled className='bg-primary hover:bg-primary/90'>Download Google Authenticator</Button>
            </CardContent>
        </Card>
    )
}