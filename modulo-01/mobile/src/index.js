import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from "react-native";

import api from "./services/api";

/**
 * View: div, footer, header, main, aside, section
 * Text: p, span, strong, h1, h2, h3..
 *
 * Não possuem valor semântico
 * Não possuem estilização própria
 * Todos os componentes por padrão são "display: flex"
 * Não existe herança de estilos
 */

export default function () {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("projects").then((response) => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post("projects", {
            title: `Novo projeto ${Date.now()}`,
            owner: "Adelmo Dias",
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container}>
                <Text style={styles.pageTitle}>Projetos:</Text>

                <FlatList
                    style={styles.projectsList}
                    data={projects}
                    keyExtractor={(project) => project.id}
                    renderItem={({ item }) => {
                        return (
                            <Text style={styles.projectTitle}>
                                {item.title}
                            </Text>
                        );
                    }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#7159c1",
        padding: 15,
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
    },
    projectsList: {},
    pageTitle: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
        letterSpacing: 1.5,
        marginBottom: 20,
    },
    projectTitle: {
        fontSize: 15,
        color: "white",
        marginBottom: 5,
    },
    button: {
        // alignSelf: "stretch",
        backgroundColor: "white",
        margin: 20,
        height: 50,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
});
