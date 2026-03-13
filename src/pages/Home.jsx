import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sand-50 py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-sand-900 mb-6">
            Restored
          </h1>
          <p className="text-lg md:text-xl text-sand-600 mb-10 leading-relaxed">
            Un espace sûr pour déposer ce qui vous pèse, en toute confidentialité.
            Ici, vous pouvez partager vos challenges de vie de manière anonyme,
            sans crainte d'être jugé·e.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-sand-600 text-sand-50 px-8 py-3 rounded-full text-sm font-semibold hover:bg-sand-900 transition-colors"
          >
            Écrire un message
          </Link>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-sand-100 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-sand-900 text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Écrivez',
                desc: 'Rédigez votre message en toute liberté. Pas besoin de vous identifier.',
              },
              {
                step: '2',
                title: 'Envoyez',
                desc: 'Votre message arrive de manière totalement anonyme. Personne ne saura qui vous êtes.',
              },
              {
                step: '3',
                title: 'Respirez',
                desc: 'Vous avez fait un pas. Déposer ce qui pèse, c\'est déjà beaucoup.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-sand-600 text-sand-50 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-serif text-xl font-semibold text-sand-900 mb-2">{title}</h3>
                <p className="text-sand-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Vanessa */}
      <section className="bg-sand-50 py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo placeholder */}
            <div className="w-32 h-32 rounded-full bg-sand-300 flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-4xl font-bold text-sand-50">V</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-sand-900 mb-4">
                À propos de Vanessa
              </h2>
              <p className="text-sand-600 leading-relaxed mb-4">
                Passionnée par les relations humaines et le bien-être émotionnel,
                Vanessa a suivi un parcours en psychologie et en relation d'aide.
                Après plusieurs années d'accompagnement auprès de personnes traversant
                des périodes difficiles, elle a constaté un besoin profond : pouvoir
                s'exprimer librement, sans filtre et sans peur du jugement.
              </p>
              <p className="text-sand-600 leading-relaxed">
                C'est de cette conviction qu'est né <strong className="text-sand-900">Restored</strong> —
                un espace où chacun peut déposer ses fardeaux en toute sécurité.
                Vanessa lit personnellement chaque message avec bienveillance et respect,
                parce qu'elle croit que le simple fait d'exprimer ce qui pèse
                est déjà un premier pas vers la guérison.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
