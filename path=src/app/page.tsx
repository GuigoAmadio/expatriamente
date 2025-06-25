{
  /* Hero Section */
}
<section className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 py-32 lg:py-40">
  <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full"
    >
      <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
        Cuidado com a sua
        <span className="text-blue-600 dark:text-blue-400"> saúde mental</span>
        <br />
        onde você estiver
      </h1>
      <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
        Consultas psiquiátricas online para brasileiros vivendo no exterior.
        Atendimento especializado que compreende os desafios únicos da vida
        expatriada.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
        <Link href="#contato">
          <Button variant="primary" size="lg">
            Agendar Primeira Consulta
          </Button>
        </Link>
        <Link href="#servicos">
          <Button variant="outline" size="lg">
            Conhecer Serviços
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2 justify-center">
        {/* ... social proof ... */}
      </div>
    </motion.div>
  </div>
</section>;

{
  /* Stats Section */
}
<section className="py-24 lg:py-32 bg-white dark:bg-gray-800">
  <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 lg:mb-24 w-full"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Os Números Falam por Si
      </h2>
      <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Resultados que mostram nosso compromisso com o bem-estar dos brasileiros
        no exterior
      </p>
    </motion.div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 w-full justify-center">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center mx-auto"
        >
          <div className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stat.number}
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {stat.label}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.description}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>;

{
  /* Services Section */
}
<section id="servicos" className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 lg:mb-24 w-full"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Serviços Especializados
      </h2>
      <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Atendimento psiquiátrico completo, pensado especificamente para
        brasileiros vivendo fora do país
      </p>
    </motion.div>
    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 w-full justify-center">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-10 lg:p-12 shadow-sm hover:shadow-lg transition-shadow mx-auto"
        >
          <div className="text-blue-600 dark:text-blue-400 mb-6">
            {service.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>;

{
  /* Testimonials Section */
}
<section id="depoimentos" className="py-24 lg:py-32 bg-white dark:bg-gray-800">
  <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 lg:mb-24 w-full"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Histórias de{" "}
        <span className="text-blue-600 dark:text-blue-400">Transformação</span>
      </h2>
      <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Brasileiros que encontraram apoio e superaram desafios com nossa ajuda
      </p>
    </motion.div>
    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 w-full justify-center">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-10 lg:p-12 mx-auto"
        >
          <div className="flex items-center mb-6 justify-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-2xl mr-4">
              {testimonial.photo}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.location}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
            "{testimonial.text}"
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>;

{
  /* FAQ Section */
}
<section id="faq" className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 lg:mb-24 w-full"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Perguntas Frequentes
      </h2>
      <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Esclarecemos as principais dúvidas sobre nossos serviços
      </p>
    </motion.div>
    <div className="space-y-8 lg:space-y-10 w-full">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-10 shadow-sm mx-auto"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {faq.question}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {faq.answer}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>;

{
  /* CTA Section */
}
<section
  id="contato"
  className="py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-green-600"
>
  <div className="max-w-3xl mx-auto flex flex-col items-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
        Sua Primeira Consulta Está a Um Clique de Distância
      </h2>
      <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
        Não deixe a distância ser um obstáculo para cuidar da sua saúde mental.
        Agende agora sua consulta com especialistas que entendem sua jornada.
      </p>
      <Link href="/auth/signin">
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold"
        >
          Agendar Consulta Gratuita
        </Button>
      </Link>
    </motion.div>
  </div>
</section>;
