import Image from 'next/image'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'

 function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="Επώνυμες Συνεργασίες"
                width={32}
                height={32}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">ΕΠΩΝΥΜΕΣ ΣΥΝΕΡΓΑΣΙΕΣ</h3>
            <p className="text-gray-600 text-sm">
              Διαθέτουμε μεγάλη γκάμα προϊόντων και αποκλειστικές προτάσεις για κάθε ανάγκη του σύγχρονου επαγγελματία.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="Ευέλικτη Εξυπηρέτηση"
                width={32}
                height={32}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">ΕΥΕΛΙΚΤΗ ΕΞΥΠΗΡΕΤΗΣΗ</h3>
            <p className="text-gray-600 text-sm">
              Φιλική και άμεση εξυπηρέτηση από εξειδικευμένο προσωπικό.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="Μαζί με τον Πελάτη"
                width={32}
                height={32}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">ΜΑΖΙ ΜΕ ΤΟΝ ΠΕΛΑΤΗ</h3>
            <p className="text-gray-600 text-sm">
              Είμαστε δίπλα σας για κάθε ανάγκη και απορία σας.
            </p>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="bg-gray-100 p-8 rounded-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Η ΕΤΑΙΡΕΙΑ</h2>
              <p className="text-gray-600 mb-4">
                Είμαστε μια δυναμική εταιρεία με μακρόχρονη παρουσία στο χώρο.
              </p>
              <Button variant="outline" className="mt-4">
                ΠΕΡΙΣΣΟΤΕΡΑ ΓΙΑ ΤΗΝ ΕΤΑΙΡΕΙΑ
              </Button>
            </div>
            <div className="relative h-64">
              <Image
                src="/placeholder.svg"
                alt="Company Office"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home;