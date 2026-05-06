const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-subtle">
        {text1}{" "}
        <span className="text-foreground">
          {text2}
        </span>
      </p>
      <span className="h-px w-10 bg-border sm:w-14" />
    </div>
  );
};

export default Title;
