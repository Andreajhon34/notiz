import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Cloud, Blocks } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="flex-1 w-full relative overflow-hidden bg-background">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 dark:to-muted/10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl dark:bg-primary/10"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#3e3e3e08,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_-100px,#ffffff05,transparent)]" />
      </div>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-muted/50 text-sm text-muted-foreground mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Now with Block Editor</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Your thoughts,
              <br />
              beautifully organized
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Notiz is a modern workspace where you can write, plan, and
              organize everything. Fast, clean, and powerful — just like your
              ideas deserve.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-base font-semibold group"
              >
                <Link to="/signup">
                  Start writing for free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 text-base"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-sm text-muted-foreground mt-6"
            >
              No credit card required · Free forever for personal use
            </motion.p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Zap,
                title: "Blazing Fast",
                desc: "Instant load, realtime autosave. No lag, no waiting.",
              },
              {
                icon: Blocks,
                title: "Block Editor",
                desc: "Notion-style blocks. Drag, drop, and slash commands.",
              },
              {
                icon: Cloud,
                title: "Cloud Sync",
                desc: "Access your notes anywhere. Auto backup to cloud.",
              },
              {
                icon: Shield,
                title: "Private & Secure",
                desc: "End-to-end encryption. Your data is yours alone.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="border-t border-border/40 bg-muted/20 dark:bg-muted/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to organize your mind?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of users who already love Notiz
            </p>
            <Button
              size="lg"
              asChild
              className="h-12 px-8 text-base font-semibold"
            >
              <Link to="/signup">
                Get Started — It's Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Notiz. Built with ❤️</p>
        </div>
      </footer>
    </div>
  );
}
