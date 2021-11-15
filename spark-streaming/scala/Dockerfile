FROM openjdk:11

WORKDIR /usr/src/app

COPY . ./

# RUN apt-get update -y && \
#     curl -fLo cs https://git.io/coursier-cli-"$(uname | tr LD ld)" && \
#     chmod +x cs && \
#     mv cs /usr/local/bin/ && \
#     cs setup --yes=true && \
#     sbt package

RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list
RUN curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add
RUN apt-get update  && apt-get install sbt -y

ENTRYPOINT [ "./entrypoint.sh" ]
